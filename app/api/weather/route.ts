import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apikey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 41.69547509615208;
    const lon = 44.80144987367162;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

    const res = await axios.get(url);


    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching forecast data", error);
    return new NextResponse("Error fetching forecast data", { status: 500 });
  }
}
