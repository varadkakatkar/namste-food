const http = require("http");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("Namaste Food API");
});

// Proxy endpoint to avoid browser CORS
const proxyRestaurants = async (req, res) => {
  try {
    const lat = req.query.lat || "18.5204";
    const lng = req.query.lng || "73.8567";
    console.log("Proxying restaurants for", { lat, lng, path: req.path });
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${encodeURIComponent(
      lat
    )}&lng=${encodeURIComponent(
      lng
    )}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const fetchOptions = {
      headers: {
        "User-Agent":
          req.get("user-agent") ||
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Referer: "https://www.swiggy.com/",
        "Accept-Language": req.get("accept-language") || "en-US,en;q=0.9",
        Origin: "https://www.swiggy.com",
      },
    };

    let response = await fetch(url, fetchOptions);

    // Fallback via corsproxy if blocked
    if (!response.ok) {
      const originalStatus = response.status;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      console.warn(
        "Primary upstream failed with",
        originalStatus,
        "retrying via corsproxy"
      );
      response = await fetch(proxyUrl, fetchOptions);
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error(
          "Upstream error (after proxy)",
          response.status,
          text?.slice(0, 300)
        );
        // Final fallback: minimal mock payload to keep UI working in dev
        const fallback = {
          data: {
            cards: [
              {
                card: {
                  card: {
                    gridElements: {
                      infoWithStyle: {
                        restaurants: [
                          {
                            info: {
                              id: "dev-1",
                              name: "Mock Restaurant 1",
                              avgRating: 4.5,
                            },
                          },
                          {
                            info: {
                              id: "dev-2",
                              name: "Mock Restaurant 2",
                              avgRating: 4.2,
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ],
          },
        };
        res.set("X-Namaste-Proxy", "fallback-mock");
        return res.status(200).json(fallback);
      }
    }

    const data = await response.json();
    console.log("data ", data);
    res.set("X-Namaste-Proxy", "upstream-ok");
    res.status(200).json(data);
  } catch (error) {
    console.log("error ", error);
    res.set("X-Namaste-Proxy", "proxy-error");
    res.status(200).json({
      data: {
        cards: [
          {
            card: {
              card: {
                gridElements: {
                  infoWithStyle: {
                    restaurants: [
                      {
                        info: {
                          id: "proxy-error-1",
                          name: "Proxy Error Mock 1",
                          avgRating: 4.1,
                        },
                      },
                      {
                        info: {
                          id: "proxy-error-2",
                          name: "Proxy Error Mock 2",
                          avgRating: 4.0,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      },
      meta: { error: "Proxy failed", details: String(error) },
    });
  }
};

// Primary proxy path used by the frontend
app.get("/api/restaurants", proxyRestaurants);

// Backward-compatible path if frontend calls "/restaurants" directly
app.get("/restaurants", proxyRestaurants);

const server = http.createServer(app);

server.listen(3030, () => {
  console.log("Server running on port 3030");
});
