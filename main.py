#!/usr/bin/env python3
"""
MR AI - Personal AI Assistant
Digital Chief of Staff style system (safe core).
"""

import asyncio
import json
from agents.job_hunter import JobHunterAgent


async def run_job_search(query: str = "Python developer"):
    agent = JobHunterAgent()
    print(agent.status())
    print("-")
    result = await agent.search(query=query, limit=10)

    print(f"Status : {result['status']}")
    print(f"Query  : {result['query']}")
    print(f"Found  : {result['count']} jobs")
    print(f"Sources: {', '.join(result['sources'])}")
    if result.get("source_warnings"):
        print(f"Warnings: {result['source_warnings']}")
    print()

    for i, job in enumerate(result.get("results") or [], 1):
        print(f"{i}. {job['title']}")
        print(f"   Company : {job['company']}")
        print(f"   Location: {job['location']}")
        print(f"   Source  : {job['source']}")
        print(f"   URL     : {job['url']}")
        print()

    print("Note:", result.get("note"))
    return result


def main():
    print("MR AI online.")
    print("Job Hunter Agent ready.")
    print("Running live search for Python developer remote jobs...")
    print()
    asyncio.run(run_job_search("Python developer"))


if __name__ == "__main__":
    main()
