export async function isValidPassword(password: string, hashedPassword: string){
  return await hashPassword(password) === hashedPassword

}

async function hashPassword(password: string){
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  return Buffer.from(hashBuffer).toString("base64");
}