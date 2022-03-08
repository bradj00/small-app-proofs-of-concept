# small-app-proofs-of-concept
 Most of these tools were written before I created a GitHub account. I can provide source code for any of these upon request.
 
Here is a small gallery of various tools i've written primarily in Vanilla Javascript, Node.JS and React.JS:

### ERC20 Token Analytics
![ERC20-analytics](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/ERC20%20contract%20browser%20analytics.png?raw=true)

Using React.JS and a Moralis SDK backend I created this tool to watch and analyze ERC20 contract interactions, then derive plain actions and categorize in realtime. This information is cached into a MongoDB backend using Moralis. New addresses are filtered through a lookup engine I created that maps publicly available data to tie addresses to an online identity. This is intended only for personal use. 

### ERC20 Contract Analytics - CLI 
![ERC20-contractWatcher](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/ERC20%20contract%20watch.png?raw=true)

This is a CLI based predecessor to my browser based ERC20 token watcher. It uses Node.JS and raw web3 node calls to a web3 provider (Infura). New addresses are filtered through a lookup engine I created that maps publicly available data to tie addresses to an online identity. 

### NFT P2E Game Analytics Tool
![NFT p2e game analytics](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/p2e%20NFT%20deeper%20game%20analytics%20and%20power%20assessments.png?raw=true)

Using Node.JS, Express.JS and raw web3 node calls to a web3 provider (Infura), this is a browser based analytics tool that gathers publicly available data centered around a Play-2-Earn NFT game and analyzes a given player's footprint in the game's virtual real estate economy.

### Browser Multiplayer 2D scroll shooter
![NFT browser shooter](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/browser_shooter.gif?raw=true)

This is an unfinished concept but a game I began developing using Node.JS and 2D sprites in the browser. Bullet and player collision is calculated using a Matter.js physics engine on the server side and web sockets enable multiplayer game modes. 

### NFT Real Estate Tracker
![real estate tracker](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/p2e%20NFT%20analytics%20tracking%20tool.png?raw=true)

This is a small tool I wrote to optimize decision making and track building performance in an NFT enabled virtual real estate property management game on Ethereum. It uses web sockets to poll game server data, web3 calls for Ethereum and Polygon on-chain data and a local database cache to reduce calls to external APIs. 








