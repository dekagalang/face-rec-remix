import type { MetaFunction } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
import axios from "axios";
// import imageTest from "../images/taylor.webp";
import { useState } from "react";

const url = `https://4000-dekagalang-templateflut-c02ljpkbkkq.ws-us106.gitpod.io`;

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// export async function loader({ request }: LoaderFunctionArgs) {
//   try {
//     // const url = new URL(request.url);
//     // const search = new URLSearchParams(url.search);
//     // if (!search.get("city")) return redirect("/");
//     // const city = search.get("city");
//     const res = await axios.get(url);
//     // console.log(res.data);
//     return res.data;
//     // return { city, type: res.data.weather[0].main, temp: res.data.main.temp };
//   } catch (err) {
//     console.error(err);
//     // redirect("/");
//     return {};
//   }
// }

export default function Index() {
  // const { result } = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resImage, setResImage] = useState<any | null>(null);
  const [box, setBox] = useState<any | null>({ x_max: 0, x_min: 0, y_max: 0, y_min: 0 });
  const { x_max, x_min, y_max, y_min } = box;
  let getSimilarity = false;
  // console.log(y_min)

  async function upload(file: any) {
    try {
      var formData = new FormData();
      formData.append('image', file);
      // const url = new URL(request.url);
      // const search = new URLSearchParams(url.search);
      // if (!search.get("city")) return redirect("/");
      // const city = search.get("city");
      // const res = await axios.post(url);
      await axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          setResImage(response.data)
          setBox(response.data.result[0].box)
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      // return res.data;
      // return { city, type: res.data.weather[0].main, temp: res.data.main.temp };
    } catch (err) {
      console.error(err);
      // redirect("/");
      // return {};
    }
  }

  if (resImage !== null) {
    getSimilarity = resImage.result[0].subjects.some((item: any) => item.similarity <= 0.9 ? false : true)
  }

  return (
    <div>
      <h1>Upload and Display Image using React Hook's</h1>
      {selectedImage && (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          {
            getSimilarity &&
            (
              <div style={{
                position: 'absolute',
                border: '5px solid red',
                top: y_min,
                left: x_min,
                width: x_max - x_min,
                height: y_max - y_min,
              }}>
              </div>
            )
          }
          <img src={URL.createObjectURL(selectedImage)} alt='test' />
        </div>

        // <div>
        //   <img
        //     alt="not found"
        //     width={"250px"}
        //     src={URL.createObjectURL(selectedImage)}
        //   />
        //   <br />
        //   <button onClick={() => setSelectedImage(null)}>Remove</button>
        // </div>
      )}

      <br />
      <br />

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          if (event.target.files) {
            // console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
            upload(event.target.files[0])
          }
        }}
      />
    </div>
    // <div style={{ position: 'relative', display: 'inline-flex' }}>
    //   <div style={{
    //     position: 'absolute',
    //     border: '5px solid red',
    //     top: y_min,
    //     left: x_min,
    //     width: x_max - x_min,
    //     height: y_max - y_min,
    //   }}>
    //   </div>
    //   <img src={imageTest} alt='test' />
    // </div>
    // <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
    //   <h1>Welcome to Remix</h1>
    //   <ul>
    //     <li>
    //       <a
    //         target="_blank"
    //         href="https://remix.run/tutorials/blog"
    //         rel="noreferrer"
    //       >
    //         15m Quickstart Blog Tutorial
    //       </a>
    //     </li>
    //     <li>
    //       <a
    //         target="_blank"
    //         href="https://remix.run/tutorials/jokes"
    //         rel="noreferrer"
    //       >
    //         Deep Dive Jokes App Tutorial
    //       </a>
    //     </li>
    //     <li>
    //       <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
    //         Remix Docs
    //       </a>
    //     </li>
    //   </ul>
    // </div>
  );
}
