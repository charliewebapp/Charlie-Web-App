import {
  POST_BOLICHE,
  GET_PRODUCTS,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  POST_ADMIN,
  GET_BOLICHES,
  GET_COLLABORATORS,
  POST_COLLABORATOR,
  UPDATE_COLLABORATOR,
  GET_ADMINS,
  SELECT_CLIENT_ADMIN,
  SADMIN_STATUS_LOGIN,
  ADMIN_STATUS_LOGIN,
  DELETE_COLLABORATOR,
  GET_ADMINISTRATORS,
  SET_CLUB_ID,
  GET_SALES,
  LOG_OUT_ADMIN,
  ADMIN_CONFIG_VIEW,
} from "./actions-types";

const initialState = {
  boliches: [],
  allBoliches: [],

  allProducts: [],
  productsActive: false,

  administrators: [],
  allAdministrators: [],

  allCollaborators: [],
  collaboratorsActive: false,

  currentClubId: "",

  salesActive: false,

  //! login admin
  getAllAdmins: [], //!Los admins de todos los boliches.
  selectAdminLogin: [], //!El admin logueado.
  selectClientAdmin: [], //!El boliche asignado a ese admin.
  sadminStatusLogin: true,
  adminStatusLogin: false, //Para acceder admin
  adminConfigView: false, // Para renderizar configuraciones admin
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    //! /////////////// PRODUCTS ////////////////////
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        collaboratorsActive: false,
        salesActive: false,
        adminConfigView: false,
        productsActive: true,
      };
    case POST_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, payload],
      };
    case UPDATE_PRODUCT:
      const updatedProducts = state.allProducts.map((product) => {
        if (product.id === payload.id) {
          return payload; // Actualiza el producto existente
        } else {
          return product;
        }
      });
      return {
        ...state,
        allProducts: updatedProducts,
      };

    case DELETE_PRODUCT:
      const noDeletedProducts = state.allProducts.filter(
        (product) => product.id !== payload
      );
      return {
        ...state,
        allProducts: noDeletedProducts,
      };

    //! ///////////////   COLLABORATORS   ////////////////////
    case GET_COLLABORATORS:
      return {
        ...state,
        allCollaborators: payload,
        productsActive: false,
        salesActive: false,
        adminConfigView: false,
        collaboratorsActive: true,
      };
    case POST_COLLABORATOR:
      return {
        ...state,
        allCollaborators: [...state.allCollaborators, payload],
      };
    case UPDATE_COLLABORATOR:
      return {
        ...state,
      };
    case DELETE_COLLABORATOR:
      const noDeletedCollaborators = state.allCollaborators.filter(
        (collaborator) => collaborator.id !== payload
      );

      return {
        ...state,
        allCollaborators: noDeletedCollaborators,
      };

    //! ///////////////CREAR BOLICHE////////////////////

    case POST_BOLICHE:
      return {
        ...state,
        boliches: [...state.boliches, payload],
        allBoliches: [...state.allBoliches, payload],
      };

    //! ///////////////CREAR ADMINISTRATORS////////////////////

    case POST_ADMIN:
      return {
        ...state,
        administrators: [...state.administrators, payload],
        allAdministrators: [...state.allAdministrators, payload],
      };

    //! ///////////////TRAER BOLICHES////////////////////

    case GET_BOLICHES:
      return {
        ...state,
        boliches: payload,
        allBoliches: payload,
      };

    //! traer todos los administradores de la base de datos entera

    case GET_ADMINS:
      return {
        ...state,
        getAllAdmins: payload,
      };

    case SELECT_CLIENT_ADMIN: //!Declarar el cliente del admin logueado como estado global
      return {
        ...state,
        selectClientAdmin: payload,
      };

    //! login super admin

    case SADMIN_STATUS_LOGIN:
      return {
        ...state,
        sadminStatusLogin: true,
      };

    //! login admin

    case ADMIN_STATUS_LOGIN:
      return {
        ...state,
        adminStatusLogin: true,
      };

    case LOG_OUT_ADMIN:
      return {
        ...state,
        adminStatusLogin: false,
      };

    case ADMIN_CONFIG_VIEW:
      return {
        ...state,
        collaboratorsActive: false,
        salesActive: false,
        productsActive: false,
        adminConfigView: true,
      };

    //? //////////////////////// TRAER ADMIN ////////////////////////////

    case GET_ADMINISTRATORS:
      return {
        ...state,
        administrators: payload,
        allAdministrators: payload,
      };

    //? //////////////////////// TRAER ADMINS DASHBOARD ////////////////////////////

    case SET_CLUB_ID:
      return {
        ...state,
        currentClubId: payload,
      };

    //! Ventas para renderizar teporario
    case GET_SALES:
      return {
        ...state,
        productsActive: false,
        collaboratorsActive: false,
        adminConfigView: false,
        salesActive: true,
      };

    default:
      return { ...state };
  }
};

export default reducer;
