// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleCounter {
    int256 private _x;

    function increment() external { _x += 1; }
    function decrement() external { _x -= 1; }
    function get() external view returns (int256) { return _x; }
}
