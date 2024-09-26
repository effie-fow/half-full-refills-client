import {
  editShopDetails,
  getNominationsForShop,
  getUniqueNominationsShops,
  postShopItem,
} from "./apiUtils";
import { countVotes } from "./countVotes";

export const countNominations = async (shopId, shopName) => {
  const nominations = await getNominationsForShop(shopId);

  if (nominations.length < 5) {
    return;
  }

  const nominationIds = nominations.map((nomination) => {
    return nomination.id;
  });

  const shopsFullNominatedItemsById = [];
  const countedNominatedItems = [];
  const finalItems = [];

  for (let nominationId of nominationIds) {
    const nominationItemsIds = await getUniqueNominationsShops(nominationId);

    nominationItemsIds.forEach((nominationItem) => {
      shopsFullNominatedItemsById.push(nominationItem.items_id);
    });
  }

  shopsFullNominatedItemsById.forEach((itemId) => {
    if (countedNominatedItems.includes(itemId)) {
      return;
    }

    const itemVoteCount = countVotes(shopsFullNominatedItemsById, itemId);
    countedNominatedItems.push(itemId);

    if (itemVoteCount > nominations.length * 0.6) {
      finalItems.push(itemId);
    }
  });

  if (!finalItems.length) {
    return;
  }

  for (let finalItemId of finalItems) {
    const shopItemObject = {
      shops_id: shopId,
      items_id: finalItemId,
    };

    await postShopItem(shopItemObject);
  }

  const updatedShop = await editShopDetails(shopId, { is_active: 1 });
  return updatedShop.data;
};
