import catJPEG from "./cat.jpg";

assert.equal(typeof catJPEG, "string");

// Check JPEG header
const catBuffer = Buffer.from(catJPEG, "base64");
assert.equal(catBuffer.slice(14, 18).toString(), "JFIF")
