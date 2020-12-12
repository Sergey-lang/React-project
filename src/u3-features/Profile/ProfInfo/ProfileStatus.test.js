import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
   test('status from props should be in the state', () => {
      const component = create(<ProfileStatus status="sergey@status.front"/>)
      const instance = component.getInstance()
      expect(instance.state.status).toBe('sergey@status.front')
   })

   test('after creation span should be displayed with correct status ', () => {
      const component = create(<ProfileStatus status="sergey@status.front"/>)

      const root = component.root
      expect(() => {
         const input = root.findByType('input')
      }).toThrow()
   })

   test('after creation span should be displayed with correct status ', () => {
      const component = create(<ProfileStatus status="sergey@status.front"/>)

      const root = component.root
      const span = root.findByType('span')
      expect(span.children[0]).toBe("sergey@status.front")
   })

   test('input should be displayed in editMode instead of span', () => {
      const component = create(<ProfileStatus status="sergey@status.front"/>)

      const root = component.root
      const span = root.findByType('span')
      span.props.onClick()
      const input = root.findByType('input')
      expect(input.props.value).toBe("sergey@status.front")
   })

   test('callback should be called', () => {
      const mockCallback = jest.fn()
      const component = create(<ProfileStatus status="sergey@status.front" onStatusChange={mockCallback}/>)
      const instance = component.getInstance()
      instance.deactivatedMode()
      expect(mockCallback.mock.calls.length).toBe(1)
   })
})