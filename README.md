# Lineup Legends

Welcome to **Lineup Legends**, the ultimate fantasy basketball lineup creation and management platform. Build your dream team, engage with the community, and showcase your strategic prowess!

## Features

### Lineup Creation
- **Budget Management**: Start with a $15 budget to create your lineup.
- **Random Player Selection**: Choose from over 200 unique players valued from 1 to 5, ensuring fairness and excitement.
- **Reorder Lineups**: Customize your lineup order to optimize performance.

### Community Engagement
- **Sharing and Upvoting**: Share your lineups, upvote others, and earn recognition.
- **Rating System**: Rate other users' lineups and receive ratings on yours.
- **Feature Lineups**: Highlight exceptional lineups to gain more visibility.

### Gambling Mechanics
- **Player Trades**: Gamble players for those of greater, equal, or lesser value, adding a strategic layer to team building.
  - *Note: Value 1 players can only be gambled for other value 1 players.*

### Social Features
- **Friend System**: Add friends and interact with their lineups, fostering a community atmosphere.
- **Comments and Threads**: Engage in discussions through comments and threaded replies.

### Sorting and Categorization
- **Advanced Sorting**: Sort lineups by various criteria like newest, oldest, highest rated, and most votes.

### Misc
- **Time Stamping and Flagging**: Track creation times and flag original posts in comments/lineups.

## Future Enhancements
- **Social Media Sharing**: Share lineups and comments on social media platforms.
- **Earning System and Store**: Earn rewards and purchase unique designs or NFTs.
- **Featured Lineups Page**: Showcase the highest voted lineups on the landing page.
- **Profile Customization**: Add profile pictures and more personalization options.
- **Mobile Responsiveness**: Add media queries to make a fully responsive app to provide a pleasant mobile experience 
  - *as of 6/14/2024 styles are only supported on desktop*




## Tech Stack
- **MongoDB**: Database for storing user data, lineups, comments, etc.
- **Express.js**: Backend framework for handling requests and responses.
- **Node.js**: Server environment for running the application.
- **EJS**: Templating engine for rendering views.

## Project Structure
- **Routes**: Define the endpoints for different functionalities.
- **Controllers**: Handle the business logic for each route.
- **Models**: Define the data schema and interactions with the database.
- **Views**: EJS templates for rendering HTML.
- **Client-side JavaScript**: Enhances interactivity and user experience.
- **Styles**: CSS for styling the application.
- **Public Images**: Store images used in the application.
- **Middleware**: Custom middleware for additional request processing.

---

## More Future Aspirations
I had a great time creating this application for my project and would love to collaborate with others one day to make this an open source project. I would like to turn this into a React Native app and use React for a web facing application. Although, I am open to staying with EJS. For styles I would like to move to sass, as you see everything is jumbled into one large stylesheet which would make maintanence a bit tougher. 

If you are interested in developing this application, whether for your own enjoyment or for when this project goes open source, here are instructions to get you started 


## Getting Started

### Clone the repository:

```bash
git clone https://github.com/yourusername/lineup-legends.git
cd lineup-legends
```

### Install dependencies:

```bash
npm install
```

### Set up environment variables:
Create a `.env` file and add your environment variables:

```env
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
```

### Run the application:

```bash
npm start
```

### Visit the application:
Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Contributing

We welcome contributions! Please fork the repository and submit pull requests.
Thank you for being part of **Lineup Legends**! Continue building, sharing, and celebrating your love for fantasy basketball with our vibrant community. Your journey as a top fantasy GM starts here!