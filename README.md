# Bitcoin Visualizer

> A real-time visualizer for the bitcoin blockchain

This visualization shows the bitcoin blockchain. Recently confirmed blocks are at the top and older ones are at the bottom.

Each rectangle is a single block of many transactions. Bitcoin processes about one block every 10 minutes.

The width of the block represents the number of transactions.

The color represents how close it is to capacity in byte size. Blocks are limited by the bitcoin protocol to 1mb, and many blocks are already very close to that limit, as you can see.

![Image of UI](https://raw.githubusercontent.com/SimplGy/bitcoin-visualizer/master/docs/screen2015-04.png)

## TODO

- [x] Live reload/watch that actually notices changes and rebuilds
- [x] D3 draws fixed dom elements that float left
- [x] Blank row at the top with a subtle title/link to the top right
- [x] Blocks set width by transaction count
- [x] colors from [http://colorbrewer2.org/](http://colorbrewer2.org/)
- [x] use [api-vcr](https://www.npmjs.com/package/api-vcr) to record responses so I can work offline
- [x] Blocks scale color by % of byte limit
- [x] Pretty-print time and block capacity
- [x] #build: a css-only change should inject new css, not refresh the browser
- [x] Split blocks by day (in local time)
- [ ] #build: rebuild js changes faster, incrementally.
- [ ] Add a model layer with caching. Confirmed blocks are immutable and the caching layer can leverage that.
- [ ] $_$: Add a donation address and QR code
- [ ] Support changing the api key so an expert user can make it work if massive traffic makes me hit the API limit
- [ ] Ask the API providers for a free rate limit upgrade for this community project
- [ ] Support infinite scroll with intelligent data requesting (fix height per day and request in days? fixed number of blocks per PX tall?)
- [ ] Consider: more interesting segmentation. Per day in local time? Responsive sizing? Other dimensions?
- [ ] Pending block (shows a dotted/transparent appearance). says "pending, last confirmed block at DD"


