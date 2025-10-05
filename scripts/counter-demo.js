// scripts/counter-demo.js
const hre = require("hardhat");

const ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // FHECounter (localhost)

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Signer:", signer.address);

  // ABI'yi artefakten otomatik alır:
  const counter = await hre.ethers.getContractAt("FHECounter", ADDRESS, signer);

  console.log("Increment tx gönderiliyor...");
  const tx1 = await counter.increment();
  const r1 = await tx1.wait();
  console.log("✅ increment tamam, hash:", r1.hash);

  console.log("Decrement tx gönderiliyor...");
  const tx2 = await counter.decrement();
  const r2 = await tx2.wait();
  console.log("✅ decrement tamam, hash:", r2.hash);

  // Opsiyonel: Eğer kontratta böyle bir getter varsa deneyelim (yoksa hata vermezden önce yakala)
  if (counter.getEncrypted) {
    try {
      const enc = await counter.getEncrypted();
      console.log("Şifreli sayaç değeri (bytes):", enc);
    } catch (e) {
      console.log("getEncrypted çağrısı desteklenmiyor gibi:", e.message);
    }
  } else {
    console.log("Not: Sayaç şifreli tutulur; düz sayı görmezsin.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
