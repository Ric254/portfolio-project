const username = prompt("What is your username?");
const host = window.location.hostname;
const protocol = window.location.protocol;
let URL = "";
let nsSocket = "";
let namespaceDiv = document.querySelector(".namespaces");

if (host.toLocaleLowerCase().includes("localhost")) {
  URL = `${protocol}//${host}:9000`;
} else {
  URL = `${protocol}//${host}`;
}

const socket = io(`${URL}`, {
  query: {
    username,
  },
});

// listen for ns list which is a list of all the namespaces
socket.on("nsList", (nsData) => {
  namespaceDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespaceDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src=${ns.img} /></div>`;
  });

  // Add click listener for each namespace
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      joinNameSpace(nsEndpoint);
    });
  });

  joinNameSpace("/wiki");
});
