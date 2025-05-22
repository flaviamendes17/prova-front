import { NextResponse } from "next/server";

export const config = {
    matcher: "/home",
};

export default function middleware(req) {
    return NextResponse.redirect(new URL("/<nome da pasta da rota>", req.url));
}
