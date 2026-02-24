function wait() {
  return new Promise(resolve => {
    setTimeout(() => resolve("done"), 1000);
  });
}

async function run() {
  console.log("waiting...");
  const result = await wait();
  console.log(result);
}

run();
