import { AppState } from './appState';
import { ActionType } from './actionType';
import { Action } from './action';


export class Reducer {

    public static reduce(oldState: AppState, action: Action): AppState {

        const newState = { ...oldState };

        switch (action.type) {

            case ActionType.getAllProducts:
                newState.products = action.payload;
                break;

            case ActionType.getAllCategories:
                newState.categories = action.payload;
                break;

            case ActionType.getCurrentUser:
                newState.user = action.payload;
                break;

            case ActionType.updateProduct:
                for (let i = 0; i < newState.products.length; i++) {
                    if (newState.products[i]._id === action.payload._id) {
                        newState.products[i] = action.payload;
                    }
                }
                break;


            case ActionType.addProduct:
                newState.products.unshift(action.payload);
                break;
        }

        return newState;

    }
}