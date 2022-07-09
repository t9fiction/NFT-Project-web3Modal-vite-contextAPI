import {GlobalStore} from '../context/GlobalState'
import Button from '@mui/material/Button';

function WalletBalance() {
    const { balance, getBalance, currentAccount } = GlobalStore();
    return (
        <div>
            <Button onClick={() => getBalance()} >Show My Balance</Button>
            {balance && <> {currentAccount} : {balance}</>}
        </div>
    );
};

export default WalletBalance;