import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apikey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 41.7151; 
    const lon = 44.8271;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting pollution data: ", error);
    return new NextResponse("Error in getting pollution data", { status: 500 });
  }
}