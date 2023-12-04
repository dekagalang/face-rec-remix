import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import boy from "../images/boy.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // const url = new URL(request.url);
    // const search = new URLSearchParams(url.search);
    // if (!search.get("city")) return redirect("/");
    // const city = search.get("city");
    const res = await axios.get(
      `https://4000-dekarosalia-templateflu-gh0a8mf3kcu.ws-us106.gitpod.io/`
    );
    // console.log(res.data);
    return res.data;
    // return { city, type: res.data.weather[0].main, temp: res.data.main.temp };
  } catch (err) {
    console.error(err);
    // redirect("/");
    return {};
  }
}

export default function Index() {
  const { result } = useLoaderData<typeof loader>();
  const { x_max, x_min, y_max, y_min } = result[0].box
  console.log(result)
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div style={{
        position: 'absolute',
        border: '5px solid red',
        top: y_min,
        left: x_min,
        width: x_max - x_min,
        height: y_max - y_min,
      }}>
      </div>
      <img src={boy} alt='boy' />
    </div>
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
