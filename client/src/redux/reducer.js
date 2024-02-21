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
  LOG_OUT_SADMIN,
  ADMIN_STATUS_LOGIN,
  DELETE_COLLABORATOR,
  GET_ADMINISTRATORS,
  SET_CLUB_ID,
  GET_SALES,
  LOG_OUT_ADMIN,
  ADMIN_CONFIG_VIEW,
  DELETE_BOLICHE,
  DELETE_ADMINISTRATORS,
  DELETE_BOLICHE_ADMINS,
  ADMIN_ID_LOGGED,
  SELECT_CLIENT_COLLABORATOR,
  COLLABORATOR_ID_LOGGED,
  COLLABORATOR_STATUS_LOGIN,
  COLLABORATOR_STATUS_LOGOUT,
  GET_ORDER_QR,
  GET_ALL_COLLABORATORS,
} from "./actions-types";

const initialState = {
  boliches: [],
  allBoliches: [],

  allProducts: [],
  productsActive: false,

  administrators: [],
  allAdministrators: [],

  collaborators: [],
  allCollaborators: [],
  collaboratorsActive: false,

  currentClubId: "",

  salesActive: false,

  //! login admin
  getAllAdmins: [], //!Los admins de todos los boliches.
  selectAdminLogin: [], //!El admin logueado.
  selectColaboratorLogin: [], //!El colaborador logueado.
  selectClientAdmin: [], //!El boliche asignado a ese admin.
  sadminStatusLogin: false,
  adminStatusLogin: true,
  colaboradorStatusLogin: true,
  adminConfigActive: false, //!Renderizar config en admin

  selectCollaboratorLogin: [], //? El colaborador logueado
  selectClientCollaborator: [], //? El boliche asignado a ese colaborador

  orderqrdata: [],
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
        adminConfigActive: false,
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
          return payload;
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
        adminConfigActive: false,
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

    //! ///////////////BORRAR BOLICHES////////////////////
    // case DELETE_BOLICHE:
    //   console.log(`Reducer deleting club: ${action.payload}`);
    //   return {
    //     ...state,
    //     boliches: state.boliches.filter(
    //       (boliche) => boliche.name !== action.payload
    //     ),
    //     allBoliches: state.allBoliches.filter(
    //       (boliche) => boliche.name !== action.payload
    //     ),
    //   };
    case DELETE_BOLICHE:
      const remainingBoliches = state.boliches.filter(
        (boliche) => boliche.name !== action.payload
      );
      return {
        ...state,
        boliches: remainingBoliches,
        allBoliches: remainingBoliches,
      };
    case DELETE_BOLICHE_ADMINS:
      const remainingAdmins = state.allAdministrators.filter(
        (admin) => admin.id !== action.payload
      );
      return {
        ...state,
        administrators: remainingAdmins,
        allAdministrators: remainingAdmins,
      };

    //! ///////////////BORRAR ADMINISTRADORES////////////////////
    case DELETE_ADMINISTRATORS:
      console.log(`Reducer deleting club: ${action.payload}`);
      return {
        ...state,
        boliches: state.boliches.filter(
          (boliche) => boliche.name !== action.payload
        ),
        allBoliches: state.allBoliches.filter(
          (boliche) => boliche.name !== action.payload
        ),
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
    //!logout super admin
    case LOG_OUT_SADMIN:
      return {
        ...state,
        sadminStatusLogin: false,
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
        productsActive: false,
        salesActive: false,
        collaboratorsActive: false,
        adminConfigActive: true,
      };

    case ADMIN_ID_LOGGED:
      return {
        ...state,
        selectAdminLogin: payload,
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
        adminConfigActive: false,
        salesActive: true,
      };

    //! login colaborador
    case GET_ALL_COLLABORATORS:
      return {
        ...state,
        collaborators: payload,
      };

    case SELECT_CLIENT_COLLABORATOR: //!Declarar el cliente del admin logueado como estado global
      return {
        ...state,
        selectClientCollaborator: payload,
      };

    case COLLABORATOR_ID_LOGGED:
      return {
        ...state,
        selectColaboratorLogin: payload,
      };

    case COLLABORATOR_STATUS_LOGIN:
      return {
        ...state,
        colaboradorStatusLogin: true,
      };

    case COLLABORATOR_STATUS_LOGOUT:
      return {
        ...state,
        colaboradorStatusLogin: false,
      };

    case GET_ORDER_QR:
      return {
        ...state,
        orderqrdata: payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
