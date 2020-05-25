import React from 'react';

class Card extends React.Component {
  state = {
    instance: this.props.instance
  }
  onChange = target => event => {
    const { onChange } = this.props
    console.log(`${target} : ${event.target.value}`)
    this.setState({
      instance: {
        ...this.state.instance,
        [target]: event.target.value
      }
    }, () => onChange(this.state.instance))
  }

  componentDidMount() {
    if (this.note && this.note.focus) {
      this.note.focus()
    }
  }
  render() {
    const { onChange } = this;
    const { instance } = this.state;
    const {
      onClick,
      index,
      children
    } = this.props;

    return (
      <div>
      <div
        onClick={() => onClick(instance)}
        className={'kelyst-card-container'}
      >
      <div className="kelyst-card">
        <img src={instance.image} />
        <div className="kelyst-card-body">
          <div className="kelyst-card-body-content">
            <textarea
              placeholder="Note"
              value={instance.note}
              onClick={e => instance.selected ? null : e.stopPropagation()}
              onChange={onChange('note')}
              ref={ref => this.note = ref}
              autoCorrect={false}
            />
          </div>
          <div className="kelyst-card-body-address">
            <input
              placeholder="Address"
              className="kelyst-input-card"
              onClick={e => instance.selected ? null : e.stopPropagation()}
              value={instance.address}
              onChange={onChange('address')}
              autoCorrect={false}
            />
          </div>
          <div className="kelyst-card-body-contact">
            <input
              className="kelyst-input-card"
              placeholder="Contact"
              onClick={e => instance.selected ? null : e.stopPropagation()}
              value={instance.contact}
              onChange={onChange('contact')}
              autoCorrect={false}
            />
          </div>
        </div>
        <div className="kelyst-card-footer">
          <div className="kelyst-card-footer-price">
          <input className="kelyst-input-card kelyst-input-card-price" placeholder="$" onClick={e => instance.selected ? null : e.stopPropagation()} type="price" value={instance.price} onChange={onChange('price')}/>
          </div>
          { children }
        </div>
      </div>
    </div>
  </div>
    )
  }
}
export default Card;
