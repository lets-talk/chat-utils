import widgetsMachine, { MachineStates, WidgetsMachineCtx } from './machine';
import { interpret } from 'xstate'
import { SET_WIDGETS_IN_STATE } from './actions';

const mockInitialContext = {
  activeRuleName: null,
  widgetsIds: [],
  widgets: {},
  positions: {},
  rules: {}
};

const mockWidget1 = {
  id: 1,
  name: 'Widget1'
}

describe('widgetsMachine', () => {
  test('Doing SET_WIDGETS_IN_STATE action', () => {
    const machine = widgetsMachine();

    const service = interpret(machine).start();

    service.onTransition(state => {
      if (state.matches(MachineStates.calculateGridDimensions)) {
        // When we enter this state we expect the context to have certain Shape
        expect((state.context as WidgetsMachineCtx)).toMatchObject(mockInitialContext);
      } else if (state.matches(MachineStates.setWidgetsRules)) {
        // When we enter this state we expect the context to have certain Shape
        expect((state.context as WidgetsMachineCtx)).toMatchObject(mockInitialContext);
      } else if (state.matches(MachineStates.updateWidgetRules)) {
        // When we enter this state we expect the context to have certain Shape
        expect((state.context as WidgetsMachineCtx).widgets).toMatchObject({
          '1': {
            mockWidget1,
          }
        })

        expect((state.context as WidgetsMachineCtx).widgetsIds).toContain(1);
      }
    });

    service.send({
      type: SET_WIDGETS_IN_STATE,
      widgets: [ mockWidget1 ],
    });
  });
})
