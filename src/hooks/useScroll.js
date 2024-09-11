const useScroll = () => {
  const blockScroll = () => (document.body.style.overflow = '');
  const unBlockScroll = () => (document.body.style.overflow = '');

  return { blockScroll, unBlockScroll };
};

export default useScroll;
