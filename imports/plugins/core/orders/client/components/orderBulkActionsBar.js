import React, { Component } from "react";
import PropTypes from "prop-types";
import { Translation, Checkbox, Button, Icon, List, ListItem } from "@reactioncommerce/reaction-ui";

class OrderBulkActionsBar extends Component {
    static propTypes = {
      labeled: PropTypes.bool,
      multipleSelect: PropTypes.bool,
      orders: PropTypes.array,
      packed: PropTypes.bool,
      picked: PropTypes.bool,
      selectAllOrders: PropTypes.func,
      selectedItems: PropTypes.array,
      setShippingStatus: PropTypes.func,
      shipped: PropTypes.bool
    };

    constructor(props) {
      super(props);
      this.state = {
        renderFlowList: false,
        picked: props.picked,
        packed: props.packed,
        labeled: props.labeled,
        shipped: props.shipped
      };
    }

    componentWillReceiveProps = (nextProps) => {
      this.setState({
        picked: nextProps.picked,
        packed: nextProps.packed,
        labeled: nextProps.labeled,
        shipped: nextProps.shipped
      });
    }

    toggleShippingFlowList = () => {
      this.setState({
        renderFlowList: !this.state.renderFlowList
      });
      this.setListItemsToDefault();
    }

    renderShippingFLowList() {
      if (this.state.renderFlowList) {
        return (
          <List className="shipping-flow-list">
            <ListItem
              label={this.state.picked ? "Generate Picking Report" : "Picked"}
              i18nKeyLabel={this.state.picked ? "order.generatePickingReport" : "order.picked"}
              value="picked"
              onClick={this.handleListItemClick}
              listItemClassName={this.state.picked ? "selected" : ""}
            >
              {this.state.picked ?
                <div>
                  <Icon className="bulk-actions-icons" icon="fa fa-print"/>
                  <Icon className="bulk-actions-icons-select" icon="fa fa-check"/>
                </div>
                :
                <Icon className="bulk-actions-icons-select" icon="fa fa-circle-o"/>}
            </ListItem>
            <ListItem
              label="Packed"
              i18nKeyLabel="order.packed"
              value="packed"
              onClick={this.handleListItemClick}
              listItemClassName={this.state.packed ? "selected" : ""}
            >
              {this.state.packed ?
                <Icon className="bulk-actions-icons-select" icon="fa fa-check"/>
                :
                <Icon className="bulk-actions-icons-select" icon="fa fa-circle-o"/>
              }
            </ListItem>
            <ListItem
              label={this.state.labeled ? "Generate Label" : "Labeled"}
              i18nKeyLabel={this.state.labeled ? "order.generateLabel" : "order.labeled"}
              value="labeled"
              onClick={this.handleListItemClick}
              listItemClassName={this.state.labeled ? "selected" : ""}
            >
              {this.state.labeled ?
                <div>
                  <Icon className="bulk-actions-icons" icon="fa fa-print"/>
                  <Icon className="bulk-actions-icons-select" icon="fa fa-check"/>
                </div>
                :
                <Icon className="bulk-actions-icons-select" icon="fa fa-circle-o"/>
              }
            </ListItem>
            <ListItem
              label="Shipped"
              i18nKeyLabel="order.shipped"
              value="shipped"
              onClick={this.handleListItemClick}
              listItemClassName={this.state.shipped ? "selected" : ""}
            >
              {this.state.shipped ?
                <div>
                  <Icon className="bulk-actions-icons" icon="fa fa-paper-plane-o" />
                  <Icon className="bulk-actions-icons-select" icon="fa fa-check"/>
                </div>
                :
                <Icon className="bulk-actions-icons-select" icon="fa fa-circle-o"/>
              }
            </ListItem>
          </List>
        );
      }
    }

    handleListItemClick = (event, value) => {
      if (this.props.setShippingStatus) {
        this.props.setShippingStatus(value, this.props.selectedItems);
      }
    }

    setListItemsToDefault() {
      if (this.state.renderFlowList === false) {
        this.setState({
          picked: false,
          packed: false,
          labeled: false,
          shipped: false
        });
      }
    }

    render() {
      const { orders, multipleSelect, selectedItems, selectAllOrders } = this.props;

      if (selectedItems.length > 0) {
        return (
          <div className="bulk-order-actions-bar">
            <Checkbox
              className="checkbox-large orders-checkbox"
              checked={selectedItems.length === orders.length || multipleSelect}
              name="orders-checkbox"
              onChange={() => selectAllOrders(orders, (selectedItems.length === orders.length || multipleSelect))}
            />
            <Translation
              className="selected-orders"
              defaultValue={`${selectedItems.length} Selected`}
              i18nKey={`${selectedItems.length} order.selected`}
            />
            <Button
              status="success"
              bezelStyle="solid"
              className="capture-orders-button"
              label="Capture"
              i18nKeyLabel="order.capture"
            />
            <Button
              status="default"
              bezelStyle="solid"
              className="bulk-actions-button"
              label="Bulk Actions"
              i18nKeyLabel="order.bulkActions"
              icon="fa fa-chevron-down"
              iconAfter={true}
              onClick={this.toggleShippingFlowList}
            />
            {this.renderShippingFLowList()}
          </div>
        );
      }
      return null;
    }
}

export default OrderBulkActionsBar;