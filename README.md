# small-app-proofs-of-concept
 Most of these tools were written before I created a GitHub account. I can provide source code for any of these upon request.
 
Here is a small gallery of of various tools i've written in Javascript, Node.JS and React.JS:

![ERC20-analytics](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/ERC20%20contract%20browser%20analytics.png?raw=true)
Using React.JS and a Moralis SDK backend I created this tool to watch and analyze ERC20 contract interactions, derive plain actions and categorize in realtime. This information is cached into a MongoDB backend using Moralis and intended for personal use. New addresses are filtered through a lookup engine I created that maps publicly available data to tie addresses to an online identity. 

![ERC20-contractWatcher](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/ERC20%20contract%20watch.png?raw=true)
Using Node.JS and raw web3 node calls to a web3 provider (Infura), this is a CLI based predecessor to my browser based ERC20 token watcher. New addresses are filtered through a lookup engine I created that maps publicly available data to tie addresses to an online identity. 

![NFT p2e game analytics](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/p2e%20NFT%20deeper%20game%20analytics%20and%20power%20assessments.png?raw=true)
Using Node.JS, express.JS and raw web3 node calls to a web3 provider (Infura), this is a browser based analytics tool that gathers publicly available data centered around a Play-2-Earn NFT game and analyzes a given player's footprint in the game's virtual real estate. This is a personal tool. 

![NFT browser shooter](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/browser_shooter.gif?raw=true)
This is an unfinished concept but a game I began developing using Node.JS and 2D sprites in the browser. Bullet and player collision is calculated using Matter.js physics engine on the server side and web sockets enable multiplayer game modes. 

![real estate tracker](https://github.com/bradj00/small-app-proofs-of-concept/blob/main/screenshots/p2e%20NFT%20analytics%20tracking%20tool.png?raw=true)
This is a small tool I wrote to optimize decision making and track building performance in an NFT enabled virtual real estate property management game on Ethereum. It uses web sockets to poll game server data, web3 calls for Ethereum and Polygon on-chain data and a local database cache to reduce calls to external APIs. 








