// src/App.jsx
import Navbar from "./navbar/Navbar";

export default function App() {
  return (
    <div className="min-h-screen navy to-blue-700">
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </div>
  );
}
