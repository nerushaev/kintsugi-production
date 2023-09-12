const useScroll = () => {
  const blockScroll = () => (document.body.style.overflow = 'hidden');
  const unBlockScroll = () => (document.body.style.overflow = '');

  return { blockScroll, unBlockScroll };
};

export default useScroll;
