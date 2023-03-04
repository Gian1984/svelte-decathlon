<script>
  import Router from 'svelte-spa-router'
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import routes from './routes'
</script>

<main>
  <Navbar/>

  <Router { routes } />

  <Footer/>

</main>
