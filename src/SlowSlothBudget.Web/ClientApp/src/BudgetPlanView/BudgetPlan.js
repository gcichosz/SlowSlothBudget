import * as React from "react";
import { Button } from "react-bootstrap";
import CategoriesPlanList from "./CategoriesPlanList";
import moment from "moment";
import auth0Client from "../Auth/Auth";

class BudgetPlan extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            planDate: moment(),
            noPlan: false
        }
    }
    
    get planCode() {
        return `${this.state.planDate.month() + 1}_${this.state.planDate.year}`
    }

    componentDidMount() {
        fetch(`/api/budgetPlans/${this.planCode}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status)
            }
        }).then(result => this.setState({budgetPlan: result})
        ).catch(error => {
            if (error.message === '404') {
                this.setState({noPlan: true});
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Budget plan for {this.state.planDate.format("MMMM")} {this.state.planDate.year()}</h1>
                {
                    this.state.noPlan ? <Button bsStyle="primary">Create plan</Button> : <CategoriesPlanList />
                }
            </div>
        )
    }
}

export default BudgetPlan;