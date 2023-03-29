// Cards.spec.js
import { mount } from '@vue/test-utils'
import Cards from 'components/construction/Cards.vue'

describe('Cards.vue', () => {
  let wrapper
  const constructions = [
    {
      id: 1,
      name: 'Construction 1',
      image: 'image1.jpg',
      progress: 50
    },
    {
      id: 2,
      name: 'Construction 2',
      image: 'image2.jpg',
      progress: 75
    }
  ]

  beforeEach(() => {
    wrapper = mount(Cards, {
      props: { constructions }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders construction cards correctly', () => {
    expect(wrapper.findAll('.construction-card').length).toBe(constructions.length)
  })

  it('shows right-click alert menu', async () => {
    const alertSpy = spyOn(window, 'alert')
    const card = wrapper.find('.construction-card')
    await card.trigger('contextmenu')
    expect(alertSpy).toHaveBeenCalled()
  })

  it('emits onCardClick event when a card is clicked', async () => {
    const card = wrapper.find('.construction-card')
    await card.trigger('click')
    expect(wrapper.emitted('onCardClick')).toBeTruthy()
  })

  it('displays progress bar with correct value', () => {
    const progressBars = wrapper.findAll('.construction-progress')
    constructions.forEach((construction, index) => {
      expect(progressBars[index].props('value')).toBe(construction.progress)
    })
  })
})