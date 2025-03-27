# CoffeeSpace Circles

A modern platform for building meaningful connections through focused group discussions and accountability circles.

![CoffeeSpace Circles](hhttps://github.com/sharathodepalli/coffeespace-circles.git)

## Features

- **Explore Circles**: Find and join circles that match your interests and goals
- **Real-time Chat**: Engage in meaningful discussions with circle members
- **Progress Tracking**: Keep track of your and your circle members' progress
- **Audio Huddles**: Join voice calls for more personal interactions
- **Weekly Recaps**: Get insights into your circle's activities and achievements
- **Smart Matching**: Find circles that best match your preferences and goals

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Lucide React Icons
- Date-fns
- Emoji Mart

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sharathodepalli/coffeespace-circles.git
cd coffeespace-circles
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/coffeespace-circles/`

### Building for Production

```bash
npm run build
```

### Deployment

The project is configured for GitHub Pages deployment. To deploy:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Project Structure

```
src/
├── components/         # React components
├── types/             # TypeScript type definitions
├── App.tsx           # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

### Key Components

- `ExploreCircles`: Browse and join available circles
- `CircleChat`: Real-time chat interface for circle discussions
- `CircleDashboard`: Overview of circle activities and metrics
- `ProgressTracker`: Track and visualize progress
- `AudioHuddle`: Voice call interface for circle meetings
- `CircleRecap`: Weekly summary and achievements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Unsplash](https://unsplash.com) for the profile images
- [Lucide](https://lucide.dev) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
