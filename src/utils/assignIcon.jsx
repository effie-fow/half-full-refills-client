import veganIcon from "../assets/icons/vegan-dark.svg";
import pastaIcon from "../assets/icons/pasta-dark.svg";
import riceIcon from "../assets/icons/rice-dark.svg";
import grainsIcon from "../assets/icons/grains-dark.svg";
import cerealsIcon from "../assets/icons/grains-dark.svg";
import nutsIcon from "../assets/icons/peanut-dark.svg";
import dried_fruitIcon from "../assets/icons/dried-fruit-dark.svg";
import sugarIcon from "../assets/icons/sugar-dark.svg";
import herbs_spicesIcon from "../assets/icons/herbs-spices-dark.svg";
import salt_pepperIcon from "../assets/icons/salt-pepper-dark.svg";
import shower_productsIcon from "../assets/icons/shower-products-dark.svg";
import oat_milkIcon from "../assets/icons/oat-milk-dark.svg";
import laundry_detergentIcon from "../assets/icons/laundry-detergent-dark.svg";
import toilet_cleanerIcon from "../assets/icons/toilet-cleaner-dark.svg";
import washing_up_liqIcon from "../assets/icons/washing-up-liquid-dark.svg";
import fruit_vegIcon from "../assets/icons/fruit-veg-dark.svg";
import vegan_friendlyIcon from "../assets/icons/vegan-dark.svg";
import step_freeIcon from "../assets/icons/wheelchair-dark.svg";
import veganIconLight from "../assets/icons/vegan-light.svg";
import pastaIconLight from "../assets/icons/pasta-light.svg";
import riceIconLight from "../assets/icons/rice-light.svg";
import grainsIconLight from "../assets/icons/grains-light.svg";
import cerealsIconLight from "../assets/icons/grains-light.svg";
import nutsIconLight from "../assets/icons/peanut-light.svg";
import dried_fruitIconLight from "../assets/icons/dried-fruit-light.svg";
import sugarIconLight from "../assets/icons/sugar-light.svg";
import herbs_spicesIconLight from "../assets/icons/herbs-spices-light.svg";
import salt_pepperIconLight from "../assets/icons/salt-pepper-light.svg";
import shower_productsIconLight from "../assets/icons/shower-products-light.svg";
import oat_milkIconLight from "../assets/icons/oat-milk-light.svg";
import laundry_detergentIconLight from "../assets/icons/laundry-detergent-light.svg";
import toilet_cleanerIconLight from "../assets/icons/toilet-cleaner-light.svg";
import washing_up_liqIconLight from "../assets/icons/washing-up-liquid-light.svg";
import fruit_vegIconLight from "../assets/icons/fruit-veg-light.svg";
import vegan_friendlyIconLight from "../assets/icons/vegan-light.svg";
import step_freeIconLight from "../assets/icons/wheelchair-light.svg";

export const assignDarkIcon = (itemName) => {
  switch (itemName) {
    case "vegan":
      return veganIcon;
    case "pasta":
      return pastaIcon;
    case "rice":
      return riceIcon;
    case "grains":
      return grainsIcon;
    case "cereals":
      return cerealsIcon;
    case "nuts":
      return nutsIcon;
    case "dried_fruit":
      return dried_fruitIcon;
    case "sugar":
      return sugarIcon;
    case "herbs_spices":
      return herbs_spicesIcon;
    case "salt_pepper":
      return salt_pepperIcon;
    case "shower_products":
      return shower_productsIcon;
    case "oat_milk":
      return oat_milkIcon;
    case "laundry_detergent":
      return laundry_detergentIcon;
    case "toilet_cleaner":
      return toilet_cleanerIcon;
    case "washing_up_liq":
      return washing_up_liqIcon;
    case "fruit_veg":
      return fruit_vegIcon;
    case "vegan_friendly":
      return vegan_friendlyIcon;
    case "step_free":
      return step_freeIcon;
  }
};

export const assignLightIcon = (itemName) => {
  switch (itemName) {
    case "vegan":
      return veganIconLight;
    case "pasta":
      return pastaIconLight;
    case "rice":
      return riceIconLight;
    case "grains":
      return grainsIconLight;
    case "cereals":
      return cerealsIconLight;
    case "nuts":
      return nutsIconLight;
    case "dried_fruit":
      return dried_fruitIconLight;
    case "sugar":
      return sugarIconLight;
    case "herbs_spices":
      return herbs_spicesIconLight;
    case "salt_pepper":
      return salt_pepperIconLight;
    case "shower_products":
      return shower_productsIconLight;
    case "oat_milk":
      return oat_milkIconLight;
    case "laundry_detergent":
      return laundry_detergentIconLight;
    case "toilet_cleaner":
      return toilet_cleanerIconLight;
    case "washing_up_liq":
      return washing_up_liqIconLight;
    case "fruit_veg":
      return fruit_vegIconLight;
    case "vegan_friendly":
      return vegan_friendlyIconLight;
    case "step_free":
      return step_freeIconLight;
  }
};
