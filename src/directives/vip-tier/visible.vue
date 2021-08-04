<script>
const visible = {
  bind(el, binding) {
    el.style.visibility = binding.value ? "visible" : "hidden";
  },
};

export default visible;
</script>
