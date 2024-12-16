import Image from "next/image";
import { getUser } from "../middleware";
import { User } from "./types";

export default async function HomePage() {
  const user = await getUser()
  
  return <div>
    {JSON.stringify(user)}

    <Image 
      alt=""
      src={user.images[0].url}
      width={user.images[0].width}
      height={user.images[0].height}
    />
  </div>;
}
