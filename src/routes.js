
import Home from "./views/Home.svelte";
import NotFound from "./views/NotFound.svelte";
import Data from "./views/Data.svelte";


const routes = new Map()

routes.set('/', Home);
routes.set('/data/', Data);
routes.set('/notfound/', NotFound);

export default routes