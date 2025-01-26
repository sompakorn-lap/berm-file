import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Home.page";
import { Icon } from "@iconify/react";
import ReactQueryProvider from "./libs/react-query/ReactQueryProvider";

function App() {
  return (
    <ReactQueryProvider>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen w-screen">

        <header className="w-full p-4 text-center bg-black text-gray-100">
          <h1 className="text-xl">BERM stack - File system</h1>
        </header>

        <main className="p-2">
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
            </Routes>
          </BrowserRouter>
        </main>

        <footer className="w-full p-2 bg-black text-gray-100">
          <a
            className="flex gap-2"
            href="https://github.com/sompakorn-lap/berm-file"
          >
            <Icon icon="mdi:github" width={24} height={24} />
            <span>GITHUB</span>
          </a>
        </footer>

      </div>
    </ReactQueryProvider>
  );
}

export default App