import Provider from "@/models/Provider";
import AllocationState from "@/models/AllocationState";

const mandatoryProviders = {
  "Service 1": [1],
  "Service 2": [5],
  "Service 3": [1, 4],
};

const providerPools = {
  "Service 1": [2, 3, 4],
  "Service 2": [6, 7, 8],
  "Service 3": [2, 3, 5, 6, 7, 8],
};

export async function allocateProviders(serviceType) {
  const assignedProviders = [];

  // STEP 1 — Add mandatory providers
  const mandatory = mandatoryProviders[serviceType];

  for (const providerNumber of mandatory) {
    const provider = await Provider.findOne({
      name: `Provider ${providerNumber}`,
    });

    if (
      provider &&
      provider.usedQuota < provider.monthlyQuota
    ) {
      assignedProviders.push(provider);
    }
  }

  // STEP 2 — Fair round robin allocation
  const pool = providerPools[serviceType];

  const allocationState =
    await AllocationState.findOne({
      serviceType,
    });
    
  let index = allocationState.currentIndex;

 let attempts = 0;

while (
  assignedProviders.length < 3 &&
  attempts < pool.length * 2
) {
  const providerNumber =
    pool[index % pool.length];

  const provider = await Provider.findOne({
    name: `Provider ${providerNumber}`,
  });

  const alreadyAssigned =
    assignedProviders.some(
      (p) =>
        p._id.toString() ===
        provider._id.toString()
    );

  if (
    provider &&
    provider.usedQuota <
      provider.monthlyQuota &&
    !alreadyAssigned
  ) {
    assignedProviders.push(provider);
  }

  index++;
  attempts++;
}

if (assignedProviders.length < 3) {
  throw new Error(
    "Not enough providers available"
  );
}
  allocationState.currentIndex =
    index % pool.length;

  await allocationState.save();

  // STEP 3 — Increment quota safely
  for (const provider of assignedProviders) {
    await Provider.findByIdAndUpdate(
      provider._id,
      {
        $inc: {
          usedQuota: 1,
        },
      }
    );
  }

  return assignedProviders;
}