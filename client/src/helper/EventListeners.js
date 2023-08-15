export const CLASSNAME_COST_VIEW = 'homepage-u-view1';

export const CLASSNAME_COST_DESC = 'cost-description';

export const CLASSNAME_WEIGHT__VIEW = 'homepage-u-view2';

export const CLASSNAME_WEIGHT_DESC = 'weight-description';

export const CLASSNAME_GRADIENT = 'linear-gradient-bg';

const CLASSNAME_SCALE_TRANSFORM = 'scale-transormation';

export const handleHover = (hoverElementId, transformElementId) => {
  const hoverElement = document.getElementById(hoverElementId);
  const transformElement = document.getElementById(transformElementId);
  const addTransform = () => {
    transformElement.classList.add(CLASSNAME_SCALE_TRANSFORM);
    transformElement.children[0].children[0].classList.add(CLASSNAME_GRADIENT);
  };
  const removeTransform = () => {
    transformElement.classList.remove(CLASSNAME_SCALE_TRANSFORM);
    transformElement.children[0].children[0].classList.remove(
      CLASSNAME_GRADIENT
    );
  };
  hoverElement.addEventListener('mouseover', addTransform);
  hoverElement.addEventListener('mouseout', removeTransform);

  return () => {
    hoverElement.removeEventListener('mouseover', addTransform);
    hoverElement.removeEventListener('mouseout', removeTransform);
  };
};
