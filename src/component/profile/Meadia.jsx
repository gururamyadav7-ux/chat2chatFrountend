import { useDispatch } from "react-redux";
import { setModelMeadia } from "../../features/MenuStatus";

export default function Meadia() {
  const disPetch = useDispatch();
  const photo = [
    {
      src: "https://tse1.mm.bing.net/th/id/OIP.CKwgoZ6t0HvbFo6OZlfU7AAAAA?r=0&w=417&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/04/23/14/23/ai-generated-7945805_1280.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Modal */}

      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white w-3/4 px-5 py-2 rounded-2xl shadow-xl animate-scale">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Media All </h2>

            <button
              onClick={() => {
                disPetch(setModelMeadia());
              }}
              className="text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className=" grid grid-cols-6 mt-4 text-gray-600">
            {photo.map((photu) => {
              console.log(photu);

              <img src={photu.src} className=" w-8 h-10" alt="" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
