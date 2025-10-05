module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("SimpleCounter", { from: deployer, args: [], log: true });
};
module.exports.tags = ["SimpleCounter"];
