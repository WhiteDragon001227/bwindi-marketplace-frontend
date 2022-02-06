import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = (props) => {
    const { alerts } = props
    useEffect(() => {
        alerts.map(alert => {
            switch (alert.alertType) {
                case 'danger':
                    toast.error(alert.msg)
                    break;
                case 'warning':
                    toast.warn(alert.msg)
                    break;
                case 'info':
                    toast.error(alert.msg)
                    break;
                case 'success':
                    toast.success(alert.msg)
                    break;
                default:
                    toast(alert.msg)
            }
        })
    }, [props])
    return (
        <ToastContainer />
    )
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
