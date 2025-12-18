import { createConsola } from "consola";

const consola = createConsola({
  reporters: [
    {
      log: (logObj) => {
        console.log(JSON.stringify(logObj));
      },
    },
  ],
});

export default consola;
