
import Home from "./views/Home.svelte";
import NotFound from "./views/NotFound.svelte";
import Games from "./views/Games.svelte";


const routes = new Map()

routes.set('/', Home);
routes.set('/games/', Games);
routes.set('/notfound/', NotFound);

export default routes