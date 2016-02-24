import { Map } from 'immutable';

const START_BIOS_ANIMATION = 'START_BIOS_ANIMATION';
const RENDER_BIOS_LOADING = 'RENDER_BIOS_LOADING';
const FINISH_BIOS_LOADING = 'FINISH_BIOS_LOADING';

export function startBiosAnimation() {
  return {
    type: START_BIOS_ANIMATION,
  }
}

export function renderBiosLoading() {
  return {
    type: RENDER_BIOS_LOADING,
  }
}

export function finishBiosLoading() {
  return {
    type: FINISH_BIOS_LOADING,
  }
}

const initialState = Map({
  startBiosAnimation: false,
  renderLoading: false,
  finishedLoading: false,
})

function biosReducer(state = initialState, action) {
  switch (action.type) {
    case START_BIOS_ANIMATION: {
      return state.set('startBiosAnimation', true);
    }

    case RENDER_BIOS_LOADING: {
      return state.set('renderLoading', true);
    }

    case FINISH_BIOS_LOADING: {
      return state.set('finishedLoading', true);
    }

    default: {
      return state
    }
  }
}

export default biosReducer;
