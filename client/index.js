/*
Joseph P. Pasaoa
Front-end JS | Express Web Server Project
*/


/* HELPERS */
const log = console.log;

const clearStage = () => {
  const stage = document.querySelector(`#response`);
  while (stage.firstChild) {
    stage.removeChild(stage.lastChild);
  }
}

const serverComm = async (method, urlAdds, body) => {
  const url = `http://localhost:11000/${urlAdds}`;
  try {
    const response = await axios[method](url, body);
    log(response.data);
    return response.data;
  } catch(err) {
    log("client-side error: ", err);
  }
}

const showResponse = (result) => {
  clearStage();

  // log("result: ", result);
  // log("jsoned: ", JSON.stringify(result, null, 2));
  const stage = document.querySelector(`#response`);
  setTimeout(() => { // gives more natural delay to displaying response
      stage.innerHTML = JSON.stringify(result, null, 3);
  }, 125);
}


/* POST DOM LOAD EXECS */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#buttonForm1').addEventListener("click", async (e) => {
      // console.dir(e.target);
      const classEntry = e.target.parentNode[0].value;
      const teacherEntry = e.target.parentNode[1].value;
      const body = {
        className: classEntry,
        teacherName: teacherEntry
      }
      const received = await serverComm("post", "class", body);
      showResponse(received);
  });
});