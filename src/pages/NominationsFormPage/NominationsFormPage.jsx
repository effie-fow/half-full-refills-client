import { NominationsFormItems } from "../../components/NominationsFormItems/NominationsFormItems";
import { NominationsFormShop } from "../../components/NominationsFormShop/NominationsFormShop";
import "./NominationsFormPage.scss";

export const NominationsFormPage = () => {
  return (
    <main className="nominations-page">
      <NominationsFormShop />
      <NominationsFormItems />
    </main>
  );
};

{
  /* ADD PATH TO FORMS PAGE

        ON FORMS PAGE:
        - 2 FORM COMPONENTS
        - FIRST FORM: SELECT A SHOP TO NOMINATE (FROM DROPDOWN) OR ADD A SHOP
          - IF "NOMINATE EXISTING" = GET SHOP ID BY NAME FOR DETAILS FORM
          - IF "ADD NEW" = ADD NEW SHOP FORM WITH BASIC DETAILS, RETURN WITH ID FOR DETAILS FORM ****** ADD RETURNING ID TO POST REQUEST (SERVER) ***** 
          - SUBMIT BUTTON = START NOMINATION
        - SECOND FORM: SEND TO NOMINATIONS USING ABOVE SHOP ID, CHECKBOX ITEMS (TURNED INTO ARRAY) AND USER ID
        - 'BEHIND THE SCENES'
          - COUNT SHOPS NUMBER OF NOMINATIONS
          - IF 100 +
            - SET SHOP 'IS_ACTIVE' TO 1
            - GET LIST OF NOMINATIONS' IDs THAT ARE ASSIGNED TO THAT SHOP
              - FOR EACH NOMINATION, PULL LIST OF ITEMS_IDs ASSIGNED TO IT IN 'NOMINATIONS_ITEMS' 
              - PUSH ALL 'ITEMS_IDs' TO ARRAY
              - LOOP THROUGH NEW ARRAY. IF A NUMBER IS REPEATED MORE THAN 70 TIMES, ADD IT TO SEPARATE 'ItemsById' ARRAY
              - ADD NEW 'SHOPS_ITEMS' ENTRY WITH 'SHOPS_ID' & 'ITEMS_ID'
            */
}
