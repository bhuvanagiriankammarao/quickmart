// src/App.jsx
import Navbar from "./components/navbar/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold underline">Hello worl!</h1>
      </main>
    </div>
  );
}
