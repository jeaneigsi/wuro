/**
 * Utilitaires pour améliorer les performances de l'application
 */

/**
 * Précharge une image pour améliorer les performances
 * @param src URL de l'image à précharger
 * @returns Une promesse qui se résout lorsque l'image est chargée
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Impossible de charger l'image: ${src}`));
  });
};

/**
 * Précharge un ensemble d'images
 * @param srcs Tableau d'URLs d'images à précharger
 * @returns Une promesse qui se résout lorsque toutes les images sont chargées
 */
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

/**
 * Fonction de debounce pour limiter la fréquence d'exécution d'une fonction
 * @param fn Fonction à debouncer
 * @param delay Délai en millisecondes
 * @returns Fonction debouncée
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Fonction de throttle pour limiter la fréquence d'exécution d'une fonction
 * @param fn Fonction à throttler
 * @param limit Limite en millisecondes
 * @returns Fonction throttlée
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Initialise les paramètres d'AOS (Animate On Scroll) pour de meilleures performances
 * @returns Configuration AOS optimisée
 */
export const getOptimizedAOSConfig = () => {
  return {
    duration: 800,
    once: true,
    delay: 0,
    throttleDelay: 99,
  };
};

/**
 * Détecte si le navigateur prend en charge les images WebP
 * @returns Une promesse qui se résout avec un booléen indiquant si WebP est supporté
 */
export const supportsWebP = async (): Promise<boolean> => {
  if (!self.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
};

/**
 * Obtient l'extension d'image optimale en fonction du support du navigateur
 * @param webpPath Chemin de l'image WebP
 * @param fallbackPath Chemin de l'image de secours (jpg/png)
 * @returns Le chemin de l'image à utiliser
 */
export const getOptimalImagePath = async (webpPath: string, fallbackPath: string): Promise<string> => {
  const webpSupported = await supportsWebP();
  return webpSupported ? webpPath : fallbackPath;
}; 