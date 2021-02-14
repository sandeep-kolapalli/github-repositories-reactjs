import { makeStyles } from '@material-ui/core/styles';

const repoGridStyles = makeStyles({
    grid: {
        height: '100vh',
        margin: '60px 30px 0 30px'
    },
    avatar:{
        width: '36px',
        height: '36px',
        borderRadius: '25px',
        marginRight: '5px',
        verticalAlign: 'middle'
    }
});

export default repoGridStyles;