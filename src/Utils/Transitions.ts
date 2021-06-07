// GSAP
import gsap from "gsap";

export const shake = (element: string): void => {
  // Shake the box when the answer is invalid
  gsap.to(element, { duration: 0.1, x: 100 })
  gsap.to(element, {
    duration: 3,
    x: 0,
    ease: "elastic.out(1, 0.1)"
  })
}